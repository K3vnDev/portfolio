export const getAnimationClassName = {
  fadeInOut: (condition: boolean) => `fade-in-out-element${condition ? ' showing' : ''}`,
  popInOut: (condition: boolean) => `pop-in-out-element${condition ? ' showing' : ''}`
}
