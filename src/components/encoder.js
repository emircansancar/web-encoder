import React, { useState, useEffect } from "react"
import { Input, Tabs, Divider } from "antd"
import CryptoJS from "crypto-js"
import InputFile from "./InputFile"
import HashList from "./HashList"

const { TextArea } = Input
const { TabPane } = Tabs

const arrayBufferToWordArray = arrayBuffer => {
  const i8a = new Uint8Array(arrayBuffer)
  const a = []
  for (var i = 0; i < i8a.length; i += 4) {
    // eslint-disable-next-line no-mixed-operators
    a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3])
  }
  return CryptoJS.lib.WordArray.create(a, i8a.length)
}

const hashTypes = [
  'MD5',
  'SHA1',
  'SHA256',
  'SHA224',
  'SHA512',
  'SHA384',
  'SHA3',
  'RIPEMD160',
]

const Encoder = () => {
  const [inputText, setInputText] = useState(null)
  const [inputFile, setInputFile] = useState(null)
  const [activeTabKey, setActiveTabKey] = useState('text')
  const [activeHashes, setActiveHashes] = useState(
    hashTypes.slice(0, 2).map(hashType => ({
      hashType,
      valuesByType: { text: null, file: null },
    }))
  )
  const [hashListLoading, setHashListLoading] = useState({ loading: false, percent: 0 })
  console.log('rerere')

  let inputFileRef = inputFile

  const calculateHashes = (tempActiveHashes) => {
    switch (activeTabKey) {
      case 'text':

        const nextActiveHashes = tempActiveHashes.map(x => {
          x.valuesByType.text = inputText ? CryptoJS[x.hashType](inputText).toString() : null
          return x
        })
        setActiveHashes(nextActiveHashes)

        break
      case 'file':
        if (!inputFile) {
          const nextActiveHashes = tempActiveHashes.map(x => {
            x.valuesByType.file = null
            return x
          })
          setActiveHashes(nextActiveHashes)
          return
        }

        setHashListLoading({ loading: true, percent: 0 })

        const
          fileReader = new FileReader(),
          chunkSize = Math.pow(1024, 2) * 2,
          chunks = Math.ceil(inputFile.size / chunkSize),
          cryptoBuffers = tempActiveHashes.map(x => ({
            hashType: x.hashType,
            buffer: CryptoJS.algo[x.hashType].create()
          }))

        let currentChunk = 0

        fileReader.onload = e => {
          const wordArray = arrayBufferToWordArray(e.target.result)
          for (const cryptoBuffer of cryptoBuffers) {
            cryptoBuffer.buffer.update(wordArray)
          }
          currentChunk++

          if (currentChunk < chunks) {
            loadNextBuffer()
          } else {
            const nextActiveHashes = tempActiveHashes.map(x => {
              const cryptoBuffer = cryptoBuffers.find(cryptoBuffer => cryptoBuffer.hashType === x.hashType)
              x.valuesByType.file = cryptoBuffer.buffer.finalize().toString()
              return x
            })
            setActiveHashes(nextActiveHashes)
            setHashListLoading({ loading: true, percent: 100 })
            setTimeout(() => {
              setHashListLoading({ loading: false, percent: 0 })
            }, 400)

          }
        }

        const loadNextBuffer = () => {
          if (!inputFileRef) {
            setHashListLoading({ loading: false, percent: 0 })
            return
          }

          const
            start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= inputFile.size) ? inputFile.size : start + chunkSize

          setHashListLoading({ loading: true, percent: (start / inputFile.size * 100).toFixed(2) })

          fileReader.readAsArrayBuffer(inputFile.slice(start, end))
        }

        fileReader.onerror = () => {
          setHashListLoading({ loading: true, percent: 100, status: "exception" })
        }

        loadNextBuffer()
        break
    }
  }

  useEffect(() => {
    calculateHashes(activeHashes)
    return () => {
      inputFileRef = null
    };
  }, [inputText, inputFile])

  return (
    <div>
      <Tabs defaultActiveKey={activeTabKey} onChange={activeKey => setActiveTabKey(activeKey)}>
        <TabPane key="text" tab="Text Checksum" style={{ height: 155 }}>
          <TextArea className="h-100" onChange={e => setInputText(e.target.value)} />
        </TabPane>
        <TabPane key="file" tab="File Checksum" style={{ height: 155 }}>
          <InputFile className="h-100" onChange={setInputFile} />
        </TabPane>
      </Tabs>
      <Divider />
      <HashList {...{ hashTypes, activeTabKey, activeHashes, calculateHashes, hashListLoading }} />
    </div >
  )
}

export default Encoder
