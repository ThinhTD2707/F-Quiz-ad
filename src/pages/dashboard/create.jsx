import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Select,
  Avatar,
  Typography,
  Tabs,
  Input,
  Checkbox,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Menu,
  MenuHandler,
  MenuList ,
  MenuItem 
} from "@material-tailwind/react";
import {
  BookmarkIcon,
  TrashIcon,
  UserIcon
} from "@heroicons/react/24/outline";

import { number } from "prop-types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { linkWithCredential, reload } from "firebase/auth";
import { useNavigate, useSubmit } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { authorsTableData, projectsTableData } from "@/data";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export function Create() {
  const [user, setUser] = useState();
  const [countUser, setCountUser] = useState();
  const [details, setDetails] = useState([]);

  const accessToken = localStorage.getItem('token');
  const headerAxios = {
    headers: {
      Authorization: accessToken,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'accept': '*/*',
      'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
    }
  };

  useEffect(() => {
    const getAllUser = () => {
      const token = localStorage.getItem('token');
      axios.get(
        `http://18.143.173.183:8080/admin/users`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'accept': '*/*',

            'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization'
          }
        }
      )
        .then(res => {
          setUser(res.data,
          setCountUser(res.data.length))
        })
        .catch(err => console.log(err));
    };
    getAllUser();
  }, []);

  console.log(user);
  function formatDate(dateString) {
    const dateTimeParts = dateString.split(' ');
    const dateParts = dateTimeParts[0].split('-');
    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];
    return `${day}/${month}/${year}`;
  }

  const userData = async () => {
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    setDetails(data);
    //  console.log(data)
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-3">
        <Card>
          <CardHeader
            variant="gradient"
            color="blue"
            className="absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            {React.createElement(UserIcon, {
              className: "w-6 h-6 text-white",
            })}
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography variant="small" className="font-normal text-blue-gray-600">
            "Total Course"
            </Typography>
            <Typography variant="h4" color="blue-gray">
              {countUser}
            </Typography>
          </CardBody>
            <CardFooter className="border-t border-blue-gray-50 p-4">
              ""
            </CardFooter>
        </Card>
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-1">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              List Of User
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Email", "status", "UpdatedAt", "Wallet", "Action"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-2 text-left"
                    >
                      <Typography
                        variant="medium"
                        className="font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {user && user.map((listUser, index) => (
                  <tr key={index}>
                    <td >
                      <div className="flex items-center ">
                        <div>
                          <Typography
                            variant="medium"
                            color="blue-gray"
                            className="font-semibold text-blue-gray-800 pl-2"
                          >
                            {listUser.name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td >
                      <Typography className="text-sm font-semibold text-blue-gray-800" >
                        {listUser.email}
                      </Typography>
                    </td>
                    <td >
                      <Menu>
                        <MenuHandler>
                          {listUser.status ? <Button color="green" size="sm" variant="outlined">Active</Button> :
                            <Button color="red" size="sm" variant="outlined">inActive</Button>
                          }
                        </MenuHandler>
                        <MenuList >
                          <MenuItem onClick={() => handleStatusChange(listUser.id, true)}>Pubic</MenuItem>
                          <MenuItem onClick={() => handleStatusChange(listUser.id, false)}>Hidden</MenuItem>
                        </MenuList>
                      </Menu>
                    </td>
                    <td >
                      <Typography className="text-sm font-semibold text-blue-gray-800 ml-2">
                      {formatDate(listUser.updatedAt)}
                      </Typography>
                    </td>
                    <td >
                      <Typography className="text-sm font-semibold text-blue-gray-800 ml-4">
                        {listUser.wallet}
                      </Typography>
                    </td>
                    <td >
                      <Button
                        onClick={() => handleSubmit(listUser.id)}
                        variant="text"
                        className="h-fit w-fit">
                        Update
                      </Button>
                      <ToastContainer />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>

        <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Authors Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Image", "function", "status", "employed", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-1 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-sm font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* {authorsTableData.map(
                ({ img, name, email, job, online, date }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {job[0]}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          {job[1]}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={online ? "green" : "blue-gray"}
                          value={online ? "online" : "offline"}
                          className="py-0.5 px-2 text-[11px] font-medium"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )} */}
              {details.map((val, id) => (
                console.log(val.img)
              ))}
              {details.map(
                ({ img, username, email, role }, key) => {
                  const className = `py-1 px-3 ${key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                    }`;

                  return (
                    <tr key={username}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar className="w-3/4 h-24" src={img} alt={username} size="sm" />

                        </div>
                      </td>
                      <td className={className}>
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {username}
                          </Typography>
                          <Typography className="text-sm font-normal text-blue-gray-500">
                            {email}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-sm font-semibold text-blue-gray-600"
                        >
                          {role}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-sm font-semibold text-blue-gray-600"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      </div>
    </div>
  );
}
export default Create;