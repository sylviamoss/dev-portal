package main

import (
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/gocolly/colly"
)

const (
	SCHEME   = "https://"
	DOMAIN   = "dev-portal-git-staging-hashicorp.vercel.app"
	DATO     = "datocms-assets.com"
	WWW_DATO = "www.datocms-assets.com"
	CONTENT  = "content.hashicorp.com"
)

func main() {
	fmt.Println("Crawling...")
	c := colly.NewCollector(
		colly.AllowedDomains(DOMAIN, DATO, WWW_DATO, CONTENT),
		colly.MaxDepth(2),
		colly.IgnoreRobotsTxt(),
		// ignore versioned URLs
		colly.DisallowedURLFilters(
			regexp.MustCompile(`v\d+\.\d+\.(\d|x)+`),
		),
	)

	c.Limit(&colly.LimitRule{
		DomainGlob:  "*hashicorp*",
		Parallelism: 1,
		Delay:       time.Duration(500) * time.Millisecond,
		RandomDelay: time.Duration(100) * time.Millisecond,
	})

	// Visit <a> tags
	c.OnHTML("a[href]", func(e *colly.HTMLElement) {
		link := e.Attr("href")

		ctx := colly.NewContext()
		ctx.Put("Referrer", e.Request.URL.String())
		c.Request(http.MethodGet,
			e.Request.AbsoluteURL(link),
			nil, ctx, nil)
	})

	// Visit <img> tags
	c.OnHTML("img[src]", func(e *colly.HTMLElement) {
		link := e.Attr("src")

		// ignore data urls
		if strings.HasPrefix(link, "data:") {
			return
		}

		ctx := colly.NewContext()
		ctx.Put("Referrer", e.Request.URL.String())
		c.Request(http.MethodGet,
			e.Request.AbsoluteURL(link),
			nil, ctx, nil)
	})

	c.OnRequest(func(r *colly.Request) {
		// noop
	})

	c.OnResponse(func(r *colly.Response) {
		line := fmt.Sprintf("[%d] Referrer: %s -> Result: %s\n", r.StatusCode, r.Request.Ctx.Get("Referrer"), r.Request.URL)
		fmt.Print(line)
	})

	c.OnError(func(r *colly.Response, cErr error) {
		line := fmt.Sprintf("[%d] Referrer: %s -> Result: %s\n", r.StatusCode, r.Request.Ctx.Get("Referrer"), r.Request.URL)
		fmt.Print(line)
	})

	c.Visit(fmt.Sprintf("%s%s", SCHEME, DOMAIN))
}
