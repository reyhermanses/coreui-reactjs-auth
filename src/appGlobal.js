

const AcquiredTokenData = async ()  => {
  
  let storage = await localStorage.getItem('authSession')

  // console.log(storage)
  // return storage !== null ? JSON.parse(storage) : 'oit'
}


export{AcquiredTokenData}