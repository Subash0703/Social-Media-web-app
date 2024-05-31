import React, { useEffect, useState } from "react";
import { Card, message, Avatar } from "antd";
import { db, storage } from "@/utils/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Triangle } from "react-loader-spinner";
import Navbar from "../Navbar/Navbar";


const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isloading, setIsLoading] = useState(true)
  const [messageApi, contextHolder] = message.useMessage();

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);
      const postsArray = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          let profileImgUrl = "";
          try {
            profileImgUrl = await getDownloadURL(ref(storage, `profile/${data.uid}`));
          } catch (error) {
            console.error(`Error fetching profile image for UID: ${data.uid}`, error);
          }
          return { id: doc.id, ...data, profileImgUrl };
        })
      );
      setPosts(postsArray);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
    } catch (error) {
      console.error("Error fetching posts: ", error);
      messageApi.error("Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isloading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Triangle
          visible={true}
          height="200"
          width="100"
          color="#000000"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="">
      <div className="flex flex-row flex-wrap justify-center items-center mt-6 p-12 gap-12">
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.username}
            bordered={true}
            loading={loading}
            hoverable={true}
            className="flex-1 flex-grow"
          >
            <Avatar size={80} src={post.profileImgUrl} className="mb-2" />
            <h2 className="font-semibold">{post.posttitle}</h2>
            <p>{post.postcontent}</p>
          </Card>
        ))}
      </div>
      </div>
    </>
  );
};

export default Post;
