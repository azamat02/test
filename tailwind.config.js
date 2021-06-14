module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    transitionProperty: { // defaults to these values
      'none': 'none',
      'all': 'all',
      'default': ['background-color', 'border-color', 'color', 'fill', 'stroke', 'opacity', 'box-shadow', 'transform'],
      'colors': ['background-color', 'border-color', 'color', 'fill', 'stroke'],
      'bg': 'background-color',
      'border': 'border-color',
      'color': 'color',
      'opacity': 'opacity',
      'shadow': 'box-shadow',
      'transform': 'transform',
      'width': 'width'
    },
    transitionDuration: { // defaults to these values
      'default': '250ms',
      '0': '0ms',
      '50': '50ms',
      '75': '75ms',
      '100': '100ms',
      '150': '150ms',
      '200': '200ms',
      '250': '250ms',
      '300': '300ms',
      '400': '400ms',
      '500': '500ms',
      '750': '750ms',
      '1000': '1000ms',
    },
    transitionTimingFunction: { // defaults to these values
      'default': 'ease',
      'linear': 'linear',
      'ease': 'ease',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    },
    transitionDelay: { // defaults to these values
      'default': '0ms',
      '0': '0ms',
      '100': '100ms',
      '250': '250ms',
      '500': '500ms',
      '750': '750ms',
      '1000': '1000ms',
    },
    willChange: { // defaults to these values
      'auto': 'auto',
      'scroll': 'scroll-position',
      'contents': 'contents',
      'opacity': 'opacity',
      'transform': 'transform',
    },
  },
  variants: { // all the following default to ['responsive']
    transitionProperty: ['responsive'],
    transitionDuration: ['responsive'],
    transitionTimingFunction: ['responsive'],
    transitionDelay: ['responsive'],
    willChange: ['responsive'],
  },
  plugins: [
    require('tailwindcss-transitions')(),
  ]
}
