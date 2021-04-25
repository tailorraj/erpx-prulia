/***
 * Description: Truncates the text and shows a conditional tooltip with the full text.
 *
 * Usage: <text-truncate :limit="25" omission=" [...]">This is some text that will be truncated.</text-truncate>
 */

import TextTruncateTooltip from './TextTruncateTooltip'
import truncate from 'lodash/truncate'

export default {
  functional: true,

  props: {
    limit: {
      type: Number,
      default: 30
    },

    align: {
      type: String,
      default: 'bottom'
    },

    omission: {
      type: String,
      default: '...'
    },

    separator: {
      type: String
    }
  },

  render(h, { props, slots }) {
    const getChildrenTextContent = function(children) {
      return children
        .map(function(node) {
          return node.children
            ? getChildrenTextContent(node.children)
            : node.text
        })
        .join('')
    }

    if (!slots().default) return /* don't render anything. */
    let content = getChildrenTextContent(slots().default)
    if (content.trim().length <= props.limit) return slots().default

    // Truncated content
    content = truncate(content, {
      length: props.limit,
      omission: props.omission,
      separator: props.separator || /,? +/
    })
    return h(
      TextTruncateTooltip,
      { props, scopedSlots: { text: () => content } },
      [slots().default]
    )
  }
}
