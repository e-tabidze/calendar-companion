import React from 'react'

const HOC = <P extends {}>(WrappedComponent: React.ComponentType<P>, condition: boolean) => {
  
  return (props: P) => {
    if (condition) {

      return <WrappedComponent {...props} />
    }
    
    return null
  }
}

export default HOC
