import { withInstall } from '../utils/withInstall'
import _BaseMap from './index.vue'
import type { DefineComponent } from 'vue'

export const BaseMap: any = withInstall<DefineComponent<{}, {}, any>, any>(
  _BaseMap
)
export default BaseMap
