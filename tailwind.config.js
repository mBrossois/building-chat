module.exports = {
    theme: {
      extend: {
        colors: {
          // Configure your color palette here
          'light-pink-color': '#FDB0D4',
          'header-color': '#4D1831',
          'main-color': '#B13871',
          'background-color': '#FAF4E6',
          'lila-color': '#E4C1F9',
          'window-bg': '#EDF3FF',
        },
        animation: {
          'line-loading': 'line-loading 1s linear infinite'
        },
        keyframes: {
          'line-loading': {
            '0%, 100%': { transform: 'rotate(-45deg)' },
            '50%': { transform: 'rotate(45deg)' },
          }
        }
      }
      
    }
  }