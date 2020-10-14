import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryCache,
} from "react-query";
import Api from '../../api';

function Home() {

    const [ focusedUser, setFocusedUser ] = useState(null);

    const { status, data, error, isFetching } = useQuery("users", Api.getUsers);

    // Cache
    const cache = useQueryCache();

    // delete Mutation
    const [ mutateDelete, { deleteUserStatus }] = useMutation(Api.deleteUser, {
        onSuccess: () => {
            cache.invalidateQueries("users");
        }
    })
    // update Mutation
    const [ mutateUpdate, { updateUserStatus }] = useMutation(Api.updateUser, {
        onSuccess: () => {
            cache.invalidateQueries("users");
        }
    });
    // create Mutation
    const [ mutateCreate, { createUserStatus }] = useMutation(Api.createUser, {
        onSuccess: () => {
            cache.invalidateQueries("users");
        }
    });

    const handleDelete = id => {
        return mutateDelete(id);
    }

    const handleAddNew = () => {
        setFocusedUser({ name: "name here", email: "email here..." })
    }

    const selectName = (userObj) => {
        setFocusedUser(userObj);
    }

    const handleUpdateFocusedUser = e => {
        let newObj = {
            ...focusedUser,
            [e.target.name]: e.target.value,
        };
        setFocusedUser(newObj);
        console.log('state has changed', newObj);
    }

    const handleSubmit = (obj) => {
        if (focusedUser.id) {
            setFocusedUser(null);
            return mutateUpdate(obj)
        }
        setFocusedUser(null);
        return mutateCreate(obj);
    }

    if (isFetching) {
        return <h1>Loading...</h1>
    }
    return (
        <div className="home__container">
            <h1>Yeah Bro I'm Cool</h1>
            <div className="w-100 flex-center flex-col">
        <ul>
          {data && data.map((eachUser) => (
            <li key={eachUser.id}>
                <p className="users__name" onClick={() => selectName(eachUser)}>
                {eachUser.name}
                </p>
                <div className="flex-row space-around">
                  <p className="users__email" >{eachUser.email}</p>
                  <button onClick={() => handleDelete(eachUser.id)}>Delete</button>
                </div>
            </li>
          ))}

            { isFetching && <p>Loading Spinner here... </p>}
            { error && <p>Oh No Somethings Wrong, please contact support....</p>}
            
              <button onClick={handleAddNew}>Add New?</button>
        </ul>

        {
            focusedUser && (
                <div className="modal">
                    { focusedUser.id ? <p>ID# {focusedUser.id}</p> : <p>enter details...</p> }
                    
                    <input name="name" value={focusedUser.name} onChange={handleUpdateFocusedUser} />
                    <input name="email" value={focusedUser.email} onChange={handleUpdateFocusedUser} />
                    { focusedUser.id ? <button onClick={() => handleSubmit(focusedUser)}>Update</button> : <button onClick={() => handleSubmit(focusedUser)}>Submit</button> }
                </div>
            )
        }



        </div>
    </div>
    )
}

export default Home;