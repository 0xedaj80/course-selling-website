import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { TextField, Card, Button } from "@mui/material";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

function Course() {
  const { courseId } = useParams();
  const [course, setcourses] = useRecoilState(coursesState);

  console.log("course");

  useEffect(() => {
    fetch("http://localhost:3000/admin/course/" + courseId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((resp) => {
      resp.json().then((data) => {
        setcourses(data.course);
      });
    });
  }, []);

  return (
    <div>
      <Graytopper title={course.title}></Graytopper>

      <Grid container >
        <Grid item lg={8} md={12} sm={12}>
          <Updatecard courseId={courseId}></Updatecard>
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <Coursetable courseId={courseId}></Coursetable>
        </Grid>
      </Grid>
    </div>
  );
}

function Graytopper({ title }) {
  return (
    <div
      style={{
        height: "250px",
        background: "#212121",
        width: "100vw",
        top: 0,
        zIndex: "0",
        marginBottom: "-250px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "250px",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: "600" }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function Coursetable(props) {
  const courses = useRecoilValue(coursesState);

  console.log("course-table");

  return (
    <div
      style={{
        
        display: "flex",
        marginTop: 50,
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Card
        style={{
          
          margin: 10,
          width: 350,
          minHeight: 200,
          borderRadius: 20,
          marginRight: 50,
          paddingBottom: 15,
          zIndex: 2,
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography textAlign={"center"} variant="h5">
            {courses.title}
          </Typography>
          <Typography textAlign={"center"} variant="subtitle1">
            {courses.description}
          </Typography>
          <br />

          <Typography textAlign={"center"} variant="h4">
            {courses.price}
          </Typography>
        </div>
      </Card>
    </div>
  );
}

function Updatecard(props) {
  console.log("update-card");

  const [courses, setcourses] = useRecoilState(coursesState);
  const [title, setTitle] = useState(courses.title || "");
  const [description, setDescription] = useState(courses.description || "");
  const [price, setPrice] = useState(courses.price || "");

  useEffect(() => {
    setTitle(courses.title); // Sync local state with atom when atom changes
    setDescription(courses.description); // Sync local state with atom when atom changes
    setPrice(courses.price); // Sync local state with atom when atom changes
  }, [courses]);
  
  console.log(title);

  return (
    <div style={{ 
      display: "flex",
      justifyContent: "center",
      }}>
      <Card 
       variant="outlined" 
      style={{
         borderRadius: 20,

          maxWidth:600,
          marginTop:200,
          width:"100%"
         }}>
        <div style={{ padding: 20 }}>
          <Typography variant="h5" style={{ marginBottom: 10 }}>
            UPDATE COURSE
          </Typography>
          <TextField
            value={title}
            onChange={(e) => {
              const val = e.target.value;
              setTitle(val);
            }}
            style={{ marginBottom: 10 }}
            fullWidth={true}
            label="title"
            variant="outlined"
          />
          <br /> <br />
          <TextField
            value={description}
            onChange={(e) => {
              const val = e.target.value;
              setDescription(val);
            }}
            style={{ marginBottom: 10 }}
            fullWidth={true}
            label="description"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            value={price}
            onChange={(e) => {
              const val = e.target.value;
              setPrice(val);
            }}
            style={{ marginBottom: 10 }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />
          <br />
          <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={() => {
              fetch("http://localhost:3000/admin/courses/" + props.courseId, {
                method: "PUT",
                body: JSON.stringify({
                  title: title,
                  description: description,
                  imageLink: "nothing",
                  published: true,
                  price: price,
                }),
                headers: {
                  "content-type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }).then((resp) => {
                resp.json().then((data) => {
                  let Updatedcourse = {
                    _id: courses._id,
                    title: title,
                    description: description,
                    imageLink: "nothing",
                    price,
                  };

                  setcourses(Updatedcourse);
                  // alert("course updated")
                });
              });
            }}
          >
            update course
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Course;

const coursesState = atom({
  key: "coursesState",
  default:"",
});
