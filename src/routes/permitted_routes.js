import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PermittedRoutes = (props) => {
  let location = useLocation();
  const [isAllowed, setIsAllowed] = useState([]);
  const permissions = useSelector(
    (state) => state?.auth?.profile?.permissions?.permissions
  );

  // const permissions = '[{"id":0,"key":"plexarUsers","title":"Plexaar Users","permissions":{"isEdit":false,"isAdd":true,"isView":false,"isDelete":false}},{"id":1,"title":"Admin Users","key":"adminUsers","permissions":{"isEdit":true,"isAdd":false,"isView":true,"isDelete":true}},{"id":2,"title":"Business List","key":"businessList","permissions":{"isEdit":true,"isAdd":false,"isView":false,"isDelete":true}},{"id":3,"title":"Individual Users","key":"individualUsers","permissions":{"isEdit":false,"isAdd":false,"isView":true,"isDelete":true}},{"id":4,"title":"Subscription","key":"subscriptions","permissions":{"isEdit":false,"isAdd":true,"isView":false,"isDelete":true}},{"id":5,"title":"Form Builder","key":"qaForms","permissions":{"isEdit":true,"isAdd":false,"isView":true,"isDelete":false}}]';
  useEffect(() => {
    if (permissions.length >= 1) {
      const parsedPermission = JSON.parse(permissions[0]);
      // const parsedPermission = JSON.parse(permissions);
      const userPermissions = parsedPermission.find(
        (perm) => perm.key === props.moduleKey
      );
      if (userPermissions.permissions[props.requiredPermission]) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    }
  }, [permissions, props]);
  if (!isAllowed) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return props.children;
  }
};
export default PermittedRoutes;
