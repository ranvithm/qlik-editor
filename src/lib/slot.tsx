import * as React from "react"

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...props,
        ...children.props,
        ref: ref,
      })
    }
    
    return React.createElement('span', { ...props, ref }, children)
  }
)

Slot.displayName = "Slot"