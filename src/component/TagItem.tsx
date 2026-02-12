import './TagItem.sass'
import { ParentComponent } from 'solid-js'

const TagItem: ParentComponent = (props) => {
  return <div class="tag">{props.children}</div>
}

export default TagItem
