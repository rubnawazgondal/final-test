import React, { useEffect, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../../../components/reusable_components/header";
import Button from "../../../components/reusable_components/button";
import SideBar from "../../../components/reusable_components/sidebar";

import styles from "./subscriptions_list.module.css";
// import { getNumberOfDays } from "../../../global/helper";
import MobileIcon from "../../../assets/mobile_icon.png";
import MonitorIcon from "../../../assets/monitor_icon.jpg";
import MessageLogo from "../../../assets/message_logo.jpg";
import { getGraphQlQuery } from "../../../global/fetch_requests";
import Loader from "../../../components/reusable_components/loader";
import DetailSubscription from "../detail_subscription";

const SubscriptionsList = () => {
  const auth = useSelector((state) => state.auth);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const permissions = auth?.profile?.permissions?.permissions;
  const [permission, setPermission] = useState();
  useEffect(() => {
    if (permissions.length >= 1) {
      const parsedPermission = JSON.parse(permissions[0]);
      const userPermissions = parsedPermission.find(
        (perm) => perm.key === "subscriptions"
      );
      setPermission(userPermissions);
    }
  }, [permissions]);
  useEffect(() => {
    const fetchSubscriptions = () => {
      setIsLoading(true);
      getGraphQlQuery(true, false, false, false)
        .then((res) => {
          if (res) {
            setSubscriptionList(res?.data?.subscriptions);
          }
        })
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    };
    fetchSubscriptions();
  }, []);

  return (
    <>
      <Header showAdmin={false} />
      <SideBar>
        {Object.keys(selectedIndex).length > 0 ? (
          <DetailSubscription
            list={selectedIndex.subscriberSet}
            onClick={() => setSelectedIndex({})}
          />
        ) : (
          <div className="d-flex flex-column">
            <div className={styles.heading}>Subscribed</div>
            <div className={styles.subscriptionList}>
              {subscriptionList?.map((row, index) => {
                // const numberOfDays = getNumberOfDays(row.startDate, row.endDate);
                // const showUpgradeButton = numberOfDays < 30;
                return (
                  <div key={index} className={styles.card}>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <img
                          src={MessageLogo}
                          className={styles.messageImage}
                          alt="message-logo"
                        />
                        {/* <div className={styles.cardIdName}>
                        {row.BusinessId.name.charAt(0).toUpperCase() +
                              row.BusinessId.name.slice(1)}
                        {row.BusinessId}
                      </div> */}
                        <div className={styles.cardHeading}>Businesses</div>
                        {/* {row.total} */}
                        {/* <div className={styles.cardTotal}>{row.id}</div> */}
                      </div>
                      <div>
                        <BsThreeDotsVertical />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <div>
                        <div className=" subtype">Subscription Type</div>
                        {/* <div className=" pro text-start">{row.type}</div> */}
                      </div>
                      <div>
                        <div className="text-end subtype">Expires in</div>
                        <div
                          className={`text-end twinty ${
                            // showUpgradeButton
                            //   ? styles.numberOfDaysColorRed:
                            styles.numberOfDaysColorBlack
                          }`}
                        >
                          ({row.endDate})
                        </div>
                      </div>
                    </div>
                    <div className={styles.divider} />
                    <div className="d-flex flex-wrap justify-content-between">
                      <div>
                        <img
                          className="vector "
                          src={MobileIcon}
                          alt="no-data"
                        />
                        &nbsp; &nbsp;
                        <img
                          className="vector1 "
                          src={MonitorIcon}
                          alt="no data"
                        />
                      </div>

                      <div className="pe-0 ps-4 text-end">
                        <div className="d-flex flex-wrap pe-0 me-0">
                          {/* <div className="mb-2 mb-md-0">
                          {showUpgradeButton && (
                            <Button
                              isGreyButton={true}
                              className="p-0 py-2 px-3"
                            >
                              {"Upgrade"}
                            </Button>
                          )}
                        </div> */}
                          <div className="ms-md-2">
                            <Button
                              onClick={() => {
                                setSelectedIndex(row);
                              }}
                              className="p-0 py-2 px-3"
                            >
                              Explore More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* {index === selectedIndex &&
                    row.subscriberSet.map((item, index) => (
                      <div key={index}>
                        {"Start Date:" + item.startDate + "\n"}
                        {"Business Id" + item.BusinessId}
                      </div>
                    ))} */}
                  </div>
                );
              })}
              {isLoading && (
                <div className={styles.addButton}>
                  <Loader className="spinner-grow me-2 fs-4" />
                  <Loader className="spinner-grow me-2 fs-4" />
                  <Loader className="spinner-grow me-2 fs-4" />
                </div>
              )}
              {permission?.permissions["isAdd"] && (
                <div
                  className={styles.addButton}
                  role="button"
                  onClick={() => navigate("/create_subscription_plan")}
                >
                  <RiAddCircleFill size={100} color="548DFF" />
                </div>
              )}
            </div>
          </div>
        )}
      </SideBar>
    </>
  );
};
export default SubscriptionsList;
