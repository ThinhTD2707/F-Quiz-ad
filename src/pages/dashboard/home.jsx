import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Checkbox,
  Button,
  Chip
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";

import UseAuth from "../../config/UseAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export function Home() {
  const currentUser = UseAuth();
  const navitage = useNavigate();
  const handleClick = (e) => {
    navitage(`/dashboard/update/${e}`);
  }
  // console.log(currentUser);
  const [course, setCourse] = useState();
  const [courseTables, setcourseTable] = useState();
  const [numBerCourse, setNumbercourse] = useState();
  const [numBerCoursePrivate, setNumbercoursePrivate] = useState();

  useEffect(() => {
    const getNumberCourse = () => {
      const token = localStorage.getItem('token');
      axios.get(
        `http://18.143.173.183:8080/admin/courses`,
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
        .then(res => setNumbercoursePrivate(res.data))
        .catch(err => console.log(err));
    };
    getNumberCourse();
  }, []);

  useEffect(() => {
    const getAllCourseApi = () => {
      const token = localStorage.getItem('token');
      axios.get(
        `http://18.143.173.183:8080/course/getCourses`,
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
        .then(res => setCourse(res.data))
        .catch(err => console.log(err));
    };
    getAllCourseApi();
  }, []);

  useEffect(() => {
    const getAllCourseAdmin = () => {
      const token = localStorage.getItem('token');
      axios.get(
        `http://18.143.173.183:8080/course/getAllCourses`,
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
        .then(res => {setcourseTable(res.data), 
                      setNumbercourse(res.data.length)})
        .catch(err => console.log(err));
    };
    getAllCourseAdmin();
  }, []);

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

  const handleStatusChange = (id, newStatus) => {
    setcourseTable(courseTables.map(courseTable => {
      if (courseTable.id === id) {
        return {
          ...courseTable,
          status: newStatus
        };
      }
      return courseTable;
    }));
  }
  const handleSubmit = (id) => {
    try {
      courseTables.map(courseTable => {
        if (courseTable.id === id) {
          axios.post(`http://18.143.173.183:8080/course/editCourse/${courseTable.id}`,
            courseTable,
            headerAxios)
        }
      })
      toast.success('Update Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error('Update failed', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error(error);
    }
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     courseTables.map(courseTable => {
  //       axios.post(`http://18.143.173.183:8080/course/editCourse/${courseTable.id}`,
  //       courseTable,
  //       headerAxios
  //     )
  //     })
  //     toast.success('Update Successfully', {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       });
  //   } catch (error) {
  //     toast.error('Update failed', {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //       });
  //     console.error(error);
  //   }
  // }
  // const totalCourse = (courseTables.length)


  console.log(numBerCourse)
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-1 xl:grid-cols-3">
        {/* {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))} */}
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
              {numBerCourse}
            </Typography>
          </CardBody>
            <CardFooter className="border-t border-blue-gray-50 p-4">
              ""
            </CardFooter>
        </Card>
        <Card>
          <CardHeader
            variant="gradient"
            color="red"
            className="absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            {React.createElement(UserIcon, {
              className: "w-6 h-6 text-white",
            })}
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography variant="small" className="font-normal text-blue-gray-600">
            "Total Private Course"
            </Typography>
            <Typography variant="h4" color="blue-gray">
              {numBerCourse - numBerCoursePrivate}
            </Typography>
          </CardBody>
            <CardFooter className="border-t border-blue-gray-50 p-4">
              ""
            </CardFooter>
        </Card>
        <Card>
          <CardHeader
            variant="gradient"
            color="green"
            className="absolute -mt-4 grid h-16 w-16 place-items-center"
          >
            {React.createElement(UserIcon, {
              className: "w-6 h-6 text-white",
            })}
          </CardHeader>
          <CardBody className="p-4 text-right">
            <Typography variant="small" className="font-normal text-blue-gray-600">
            "Total Public Course"
            </Typography>
            <Typography variant="h4" color="blue-gray">
              {numBerCoursePrivate}
            </Typography>
          </CardBody>
            <CardFooter className="border-t border-blue-gray-50 p-4">
              ""
            </CardFooter>
        </Card>
        {/* {course && course.map((item) => (
          <Card className="max-w-[24rem] overflow-hidden" >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className="m-0 rounded-none h-1/2 shadow-md"

            >
              <img
                src="https://topicanative.edu.vn/wp-content/uploads/2020/08/nang-cap-von-tu-vung-tieng-anh-cuc-dinh-thong-qua-quiz-kiem-tra-2.jpg"
                alt="ui/ux review check"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h4" color="blue-gray">
                {item.name}
              </Typography>
              <Typography variant="11px" color="gray" className="mt-3 font-normal">
                {item.description}
              </Typography>
            </CardBody>
            <CardFooter className="flex items-center justify-between">
              <div className="flex items-center -space-x-3">
              </div>
              <Button className="font-bold w-fit" onClick={() => handleClick(item.id)}>Do test</Button>
            </CardFooter>
          </Card>
        ))} */}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-1">
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              List Of Course
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Description", "status", "University", "question", "Action"].map((el) => (
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
                {courseTables && courseTables.map((items, index) => (
                  <tr key={index}>
                    <td >
                      <div className="flex items-center ">
                        <div>
                          <Typography
                            variant="medium"
                            color="blue-gray"
                            className="font-semibold text-blue-gray-800 pl-2"
                          >
                            {items.name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td >
                      <Typography className="text-sm font-semibold text-blue-gray-800" >
                        {items.description}
                      </Typography>
                    </td>
                    <td >
                      <Menu>
                        <MenuHandler>
                          {items.status ? <Button color="green" size="sm" variant="outlined">Pubic</Button> :
                            <Button color="red" size="sm" variant="outlined">Hidden</Button>
                          }
                        </MenuHandler>
                        <MenuList >
                          <MenuItem onClick={() => handleStatusChange(items.id, true)}>Pubic</MenuItem>
                          <MenuItem onClick={() => handleStatusChange(items.id, false)}>Hidden</MenuItem>
                        </MenuList>
                      </Menu>
                    </td>
                    <td >
                      <Typography className="text-sm font-semibold text-blue-gray-800 ml-2">
                        {items.university}
                      </Typography>
                    </td>
                    <td >
                      <Typography className="text-sm font-semibold text-blue-gray-800 ml-4">
                        {items.questions.length}
                      </Typography>
                    </td>
                    <td >
                      <Button
                        onClick={() => handleSubmit(items.id)}
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
      </div>
    </div>
  );
}

export default Home;
