import { createContext, useContext, useState } from 'react'
import { DebuggingStateProviderProps } from './types'

const DebuggingStateContext = createContext<$TSFixMe>(undefined)

const DebuggingStateProvider = ({ children }: DebuggingStateProviderProps) => {
	const [state, setState] = useState({})

	return (
		<DebuggingStateContext.Provider value={{ state, setState }}>
			{children}
		</DebuggingStateContext.Provider>
	)
}

const useDebuggingState = () => {
	const context = useContext(DebuggingStateContext)
	if (context === undefined) {
		throw new Error(
			'useDebuggingState must be used within an DebuggingStateProvider'
		)
	}

	return context
}

export type { DebuggingStateProviderProps }
export { DebuggingStateProvider, useDebuggingState }
