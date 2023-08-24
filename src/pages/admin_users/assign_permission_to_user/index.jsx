import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Card from "../../../components/reusable_components/card";
import Header from "../../../components/reusable_components/header";
import SideBar from "../../../components/reusable_components/sidebar";
import Button from "../../../components/reusable_components/button";

import styles from "./add_permissions.module.css";
import { assignPermission } from "../../../global/fetch_requests";
import { useSelector } from "react-redux";

const defaultItem = [
  {
    id: 0,
    key: "plexarUsers",
    title: "Plexaar Users",
    permissions: {
      isEdit: false,
      isAdd: false,
      isView: false,
      isDelete: false,
    },
  },
  {
    id: 1,
    title: "Admin Users",
    key: "adminUsers",
    permissions: {
      isEdit: false,
      isAdd: false,
      isView: true,
      isDelete: false,
    },
  },
  {
    id: 2,
    title: "Business List",
    key: "businessList",
    permissions: {
      isEdit: false,
      isAdd: false,
      isView: false,
      isDelete: false,
    },
  },
  {
    id: 3,
    title: "Individual Users",
    key: "individualUsers",
    permissions: {
      isEdit: false,
      isAdd: false,
      isView: false,
      isDelete: false,
    },
  },
  {
    id: 4,
    title: "Subscription",
    key: "subscriptions",
    permissions: {
      isEdit: false,
      isAdd: false,
      isView: false,
      isDelete: false,
    },
  },
  {
    id: 5,
    title: "Form Builder",
    key: "qaForms",
    permissions: {
      isEdit: false,
      isAdd: false,
      isView: false,
      isDelete: false,
    },
  },
];

const AddPermissions = () => {
  const navigate = useNavigate();
  const params = useLocation();
  const auth = useSelector((state)=>state.auth);
  const [permissions, setPermissions] = useState(defaultItem);
  const id = params && params.state && params.state.id;
  useEffect(() => {
    if (!id) {
      navigate("/users_list");
      return;
    }
  }, [id, navigate]);

  const assignPermissionToUser = () => {
    const data = {
      userId: id,
      permissions: JSON.stringify(permissions),
      createdBy: auth?.profile?.id,
    };
    assignPermission(data)
      .then((res) => {
        if (res.code === 0) {
          navigate("/users_list");
        }
      })
      .catch((e) => alert(e))
      .finally(() => {});
  };

  const changeInputHandler = (task, i) => {
    setPermissions((prevItems) => {
      const updatedPermissions = prevItems.map((item) => {
        if (item.key === i.key) {
          if (task === "add") {
            return {
              ...item,
              permissions: {
                ...item.permissions,
                isAdd: !item.permissions.isAdd,
              },
            };
          } else if (task === "edit") {
            return {
              ...item,
              permissions: {
                ...item.permissions,
                isEdit: !item.permissions.isEdit,
              },
            };
          } else if (task === "view") {
            return {
              ...item,
              permissions: {
                ...item.permissions,
                isView: !item.permissions.isView,
              },
            };
          } else {
            return {
              ...item,
              permissions: {
                ...item.permissions,
                isDelete: !item.permissions.isDelete,
              },
            };
          }
        }
        return item;
      });
      return updatedPermissions;
    });
  };

  return (
    <>
      <Header />
      <SideBar activeIndex={0} showTitleBar={true} title="Add Permissions">
        <div className="px-5 py-4">
          {permissions.map((item, index) => (
            <Card key={index}>
              <div className="d-flex flex-column">
                <div className={styles.label}>{item.title}</div>
                <div className="d-flex">
                  <input
                    type="checkbox"
                    className="me-2"
                    onChange={() => changeInputHandler("add", item)}
                    checked={item.permissions.isAdd}
                  />
                  <div className="me-5">Add</div>
                  <input
                    type="checkbox"
                    className="me-2"
                    onChange={() => changeInputHandler("edit", item)}
                    checked={item.permissions.isEdit}
                  />
                  <div className="me-5">Edit</div>
                  <input
                    type="checkbox"
                    className="me-2"
                    onChange={() => changeInputHandler("view", item)}
                    checked={item.permissions.isView}
                  />
                  <div className="me-5">View</div>
                  <input
                    type="checkbox"
                    className="me-2"
                    onChange={() => changeInputHandler("", item)}
                    checked={item.permissions.isDelete}
                  />
                  <div className="me-5">Delete</div>
                </div>
              </div>
            </Card>
          ))}
          <div className="d-flex justify-content-end">
            <Button onClickHandler={assignPermissionToUser}>Save</Button>
          </div>
        </div>
      </SideBar>
    </>
  );
};

export default AddPermissions;
