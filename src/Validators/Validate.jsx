let regex = {
  email : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
  password:/^[a-zA-Z0-9]{6,}$/

}
function Validate(type,value) {
  if(type==="email") return regex?.email?.test(value);
  if(type==="password")return regex?.password?.test(value)
}

export default Validate