import { Context } from '@nuxt/types'
import { globalModule } from '~/store'
import isMobileUserAgent from '~/utils/isMobileUserAgent'

export default function (context: Context & { isMoblieUserAgent?: boolean }) {
  const userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent

  globalModule.setMobileUserAgent(isMobileUserAgent(userAgent as string))
}
