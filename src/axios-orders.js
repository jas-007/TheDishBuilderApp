import axios from 'axios'

const baseLink=axios.create({
    baseURL:'https://burgerbuilder-4a8e9.firebaseio.com/'
})

export default baseLink;