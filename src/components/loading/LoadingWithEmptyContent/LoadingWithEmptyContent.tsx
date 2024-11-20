import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { useViewport } from 'src/hooks/useViewport'
import { ColorRing } from 'react-loader-spinner'
import './styles.scss'

export default function LoadingWithEmptyContent() {
  const viewport = useViewport()
  const height = viewport.height

  return (
    <div className='w-full' style={{ height: height, width: 'full' }}>
      <Fragment>
        <motion.div
          className='background'
          initial={{ opacity: 0.0 }}
          animate={{
            opacity: 0.8
          }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className='main'
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={['#e6787a', '#e6787a', '#e6787a', '#e6787a', '#e6787a']}
          />
        </motion.div>
      </Fragment>
    </div>
  )
}
