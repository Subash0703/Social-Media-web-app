import React, { useEffect, useState } from "react";
import { db, storage } from "@/utils/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { Card } from "antd";
import { Triangle } from "react-loader-spinner";
import Navbar from "../Navbar/Navbar";

const { Meta } = Card;

const UserCard = ({ searchUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isloading, setIsLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        const usersList = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const userData = doc.data();
            const profileImgRef = ref(storage, `profile/${userData.uid}`);
            const profileImgsrc = await getDownloadURL(profileImgRef);
            return { ...userData, profileImgsrc };
          })
        );
        setTimeout(() => {
          setUsers(usersList);
          setLoading(false);
        }, 100);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredItems = users.filter((user) =>
      user.username.toLowerCase().includes(searchUser.toLowerCase())
    );
    setFilteredUsers(filteredItems);
  }, [searchUser, users]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
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
      <div className="flex gap-12 flex-wrap justify-center items-center">
        {filteredUsers.map((user) => (
          <Card
            key={user.uid}
            hoverable
            loading={isloading}
            style={{
              width: 200,
              headerbg: "transparent",
              backgroundColor: "whitesmoke",
              color: "white",
            }}
            cover={
              <img alt={`${user.name}'s profile`} src={user.profileImgsrc} />
            }
          >
            <Meta title={user.username} description={user.name} />
          </Card>
        ))}
      </div>
    </>
  );
};

export default UserCard;
