import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import App from './App'

import './index.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const AllyMapTheme: ThemeOptions = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#6750a4'
		},
		secondary: {
			main: '#625b71'
		},
	},
	overrides: {
		MuiSwitch: {
		  root: {
			width: 42,
			height: 26,
			padding: 0,
			margin: 8,
		  },
		  switchBase: {
			padding: 1,
			'&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
			  transform: 'translateX(16px)',
			  color: '#fff',
			  '& + $track': {
				opacity: 1,
				border: 'none',
			  },
			},
		  },
		  thumb: {
			width: 24,
			height: 24,
		  },
		  track: {
			borderRadius: 13,
			border: '1px solid #bdbdbd',
			backgroundColor: '#fafafa',
			opacity: 1,
			transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		  },
		},
	  },
	  shape: {
		borderRadius: 15,
	  },
})


ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={AllyMapTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
)