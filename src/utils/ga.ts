import { GOOGLE_ANALYTICS_ID } from '../index'

// log the pageview with their URL
export const pageview = (url: string) => {
  ;(window as any).gtag('config', GOOGLE_ANALYTICS_ID, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    page_path: url
  })
}

// log specific events happening.
type IEvent = {
  action: any
  params: any
}
export const event = ({ action, params }: IEvent) => {
  ;(window as any).gtag('event', action, params)
}
