import { useCallback, useEffect, useMemo, useState } from 'react'

interface ValidatorStaking {
  title: string
  value: number
  unit: string
}
export function useGetNETHValidatorStaking(): ValidatorStaking | undefined {
  const [info, setInfo] = useState<ValidatorStaking>()

  const url = 'https://sheet.best/api/sheets/1b2fe555-66c3-4aca-9bee-2e1122b71ed8'

  useEffect(() => {
    const callApi = async () => {
      try {
        const result = await fetch(url)
        const data = await result.json()
        setInfo({
          title: data[0]['Item'],
          value: data[0]['Value'],
          unit: data[0]['Unit']
        })
      } catch (error) {
        console.log('useGetNETHValidatorStaking error:', error)
      }
    }
    callApi()
  }, [])

  return useMemo(() => info, [info])
}
