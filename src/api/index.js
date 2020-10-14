import axios from "axios";
// all CRUD functions for users
class Api {

    static getUsers = async () => {
        let res;
        try {
            res = await axios.get(
                "http://localhost:3001/users"
            );
            console.log('getUsers | res ', res);
        } catch (error) {
            console.log('error in getUsers', error);
        }
        return res.data;
    }

    static createUser = async userObj => {
        let res;
        const uid = Math.floor(Math.random() * 1000);
        try {
            res = await axios.post(`http://localhost:3001/users`, {
                id: uid,
                ...userObj
            })
            console.log('createUser | res ', res);
        } catch (error) {
            console.log('error in createUser', error);
        }
        return res;
    }

    static deleteUser = async id => {
        let res;
        try {
            res = await axios.delete(`http://localhost:3001/users/${id}`)
            console.log('deleteUser | res ', res);
        } catch (error) {
            console.log('error in deleteUser', error);
        }
        return res;
    }

    static updateUser = async userObj => {
        let res;
        try {
            res = await axios.patch(`http://localhost:3001/users/${userObj.id}`, {
                ...userObj
            })
            console.log('updateUser | res ', res);
        } catch (error) {
            console.log('error in updateUser', error);
        }
        return res; 
    }       
}

export default Api;