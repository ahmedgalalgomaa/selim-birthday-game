export function iconMarkup(config, className) {
  if (config.iconSrc) {
    return `<img class="${className} ${className}--img" src="${config.iconSrc}" alt="" draggable="false" />`;
  }
  return `<span class="${className}">${config.icon}</span>`;
}
