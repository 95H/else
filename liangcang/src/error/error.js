let errors = (vm,url)=> {
    vm.$axios.get(url).then(
      error => {
         switch(error){
           case 429:
           alert()
           break;
         }
      }
    )
}
export default errors
