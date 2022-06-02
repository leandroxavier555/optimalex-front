export default{
    auth: (to, from, next) => {
        console.log('auth')
        if(localStorage.getItem('user-token') !=null){
            next({
                path: '/login',
              })
        }else{
            next()
        }
    },
}
    
    