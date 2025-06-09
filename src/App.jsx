import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./pages/home/HomePage";
import AboutUs from "./pages/aboutus";
import TourPackages from "./pages/tour";
import Dashboard from "./components/dashboard/dashboard";
import ManageBreed from "./pages/admin/manage-breed";
import FarmManagement from "./pages/admin/manage-farm/index";
import ManageKoiFish from "./pages/admin/manage-koi-fish";
import ProfileMenu from "./pages/profile/ProfileMenu";
import Account from "./pages/profile/manage-account/Account";
import ChangeFullName from "./pages/profile/manage-account/ChangeFullName";
import ChangeEmail from "./pages/profile/manage-account/ChangeEmail";
import ChangePhone from "./pages/profile/manage-account/ChangePhone";
import ChangePassword from "./pages/profile/manage-account/ChangePassword";
import ChangeAddress from "./pages/profile/manage-account/ChangeAddress";
import NewPassword from "./components/reset-password/NewPassword";
import TourDetail from "./pages/tour/tourdetail";
import DashboardSale from "./components/dashboard/dashboardSale";
import ManageCustomer from "./pages/sale/view-customer";
import StatusConsulting from "./pages/sale/view-consulting";
import ConsultingDashboard from "./components/dashboard/consultingDashboard";
import ViewConsulting from "./pages/sale/view-consulting";
import CustomerBookingDetail from "./pages/tour/customerdetail";
import ManageBooking from "./pages/sale/manage-booking";
import SearchTourResult from "./pages/search-tour/SearchTourResult";
import CustomTour from "./components/custom-tour";
import TourPayment from "./pages/tour/tourpayment";
import KoiFish from "./pages/koifish/index";
import KoiCart from "./pages/koifish/koicart";
import DashboardManager from "./components/dashboard/dashboardManager";
import ManageQuotation from "./pages/manager/ManageQuotation";
import FeedbackView from "./pages/manager/FeedBackView";
import ManageOpenTour from "./pages/sale/manage-open-tour";
import ManageQuotationSale from "./pages/sale/manage-quotation";
import ViewAllQuotation from "./pages/manager/ViewAllQuotation";
import ManageCustomTourSale from "./pages/sale/custom-tour/customTour";
import FarmPackages from "./pages/farm/allFarm";
import Farm from "./pages/farm/Farm";
import CustomerTourBooking from "./pages/profile/manage-tour-booking/CustomerTourBooking";
import ViewQuotation from "./pages/quotation/ViewQuotation";
import BookingPaymentSuccess from "./pages/booking-payment-result/BookingPaymentSuccess";
import BookingPaymentFailed from "./pages/booking-payment-result/BookingPaymentFailed";
import Overview from "./pages/admin/overview";

import CustomerViewOrder from "./pages/koifish/CustomerViewOrder";
import ViewTourToBooking from "./pages/consulting/order-manage/viewTourtoBooking";
import BookingList from "./pages/consulting/order-manage/BookingList";
import OrderList from "./pages/consulting/order-manage/OrderList";

import UserManagement from "./pages/admin/manage-user";
import Unauthorized from "./pages/unauthorized";

import ManageTour from "./pages/manager/ManageTour";
import TourManagement from "./pages/sale/manage-tour";
import RequiredRole from "./components/protect-route/RequireRole";
import RestrictedRole from "./components/protect-route/RestrictedRole";
import CustomerDreamTour from "./pages/profile/manage-dream-tour/CustomerDreamTour";
import HomePageKoi from "./pages/home/HomePageKoi";

// import TourBooking from './pages/tour/tourbooking';
import ManageCustombooking from "./pages/consulting/manage-custombooking/ManageCustombooking";
import ManageOrderCustomBooking from "./pages/consulting/manage-orderCustomBooking/ManageOrderCustomBooking";

import TourBooking from "./pages/tour/tourbooking";
import ManageSchedule from "./pages/consulting/manage-schedule/ManageSchedule";
import CBPaymentSuccess from "./pages/booking-payment-result/CBPaymentSuccess";
import CBPaymentFailed from "./pages/booking-payment-result/CBPaymentFailed";
import TourManagementConsul from "./pages/consulting/manage-available-tour/TourManagementConsul";
import AddFishOrder from "./pages/consulting/manage-available-tour/manage-order/AddFishOrder";
import FishOrderForBooking from "./pages/consulting/manage-available-tour/manage-order/FishOrderForBooking";
import CustomerFishOrder from "./pages/profile/manage-tour-booking/manage-order/CustomerFishOrder";
import ConsultingViewActiveTour from "./pages/consulting/manage-available-tour/ConsultingViewActiveTour";
import ConsultingViewBooking from "./pages/consulting/manage-available-tour/ConsultingViewBooking";
import OrderCustomTour from "./pages/consulting/order-customtour/OrderCustomTour";
import ConsultingViewCustomBooking from './pages/consulting/manage-custombooking/ConsultingViewCustomBooking';
import UpdateDeleteOrderCustomTour from "./pages/consulting/order-customtour/UpdateDeleteOrderCustomTour";
import CustomerOrderDreamTour from "./pages/profile/manage-dream-tour/CustomerOrderDreamTour";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "customtour-payment-success",
          element: (
            <RestrictedRole
              element={<CBPaymentSuccess />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },

        {
          path: "customtour-payment-failed",
          element: (
            <RestrictedRole
              element={<CBPaymentFailed />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "customtour",
          element: (
            <RestrictedRole
              element={<CustomTour />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "",
          element: (
            <RestrictedRole
              element={<HomePage />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "aboutus",
          element: (
            <RestrictedRole
              element={<AboutUs />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "tourpackage",
          element: (
            <RestrictedRole
              element={<TourPackages />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "/tourdetail/:tourId",
          element: (
            <RestrictedRole
              element={<TourDetail />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },

        {
          path: "homePage-koiFish",
          element: (
            <RestrictedRole
              element={<HomePageKoi />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "/tourbooking/:tourId",
          element: (
            <RestrictedRole
              element={<TourBooking />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "/tourpayment/:tourId",
          element: (
            <RestrictedRole
              element={<TourPayment />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },

        {
          path: "tourpayment-success",
          element: (
            <RestrictedRole
              element={<BookingPaymentSuccess />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },

        {
          path: "tourpayment-failed",
          element: (
            <RestrictedRole
              element={<BookingPaymentFailed />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "/customerdetail/:tourId",
          element: (
            <RestrictedRole
              element={<CustomerBookingDetail />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "farmPackage",
          element: (
            <RestrictedRole
              element={<FarmPackages />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "/farmDetail/:farmId",
          element: (
            <RestrictedRole
              element={<Farm />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "koi",
          element: (
            <RestrictedRole
              element={<KoiFish />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
        {
          path: "koicart",
          element: (
            <RestrictedRole
              element={<KoiCart />}
              restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
            />
          ),
        },
      ],
    },
    {
      path: "newpassword",
      element: <NewPassword />,
    },
    {
      path: "dashboard",
      element: <RequiredRole element={<Dashboard />} requiredRole="ADMIN" />,
      children: [
        {
          path: "breed",
          element: <ManageBreed />,
        },
        {
          path: "overview",
          element: <Overview />,
        },
        {
          path: "farm",
          element: <FarmManagement />,
        },

        {
          path: "koi-fish",
          element: <ManageKoiFish />,
        },
        {
          path: "users",
          element: <UserManagement />,
        },
      ],
    },

    {
      path: "search-tour",
      element: (
        <RestrictedRole
          element={<SearchTourResult />}
          restrictedRole={["ADMIN", "SALE", "MANAGER", "CONSULTING"]}
        />
      ),
    },
    {
      path: "dashboardSale",
      element: <RequiredRole element={<DashboardSale />} requiredRole="SALE" />,
      children: [
        {
          path: "customer",
          element: <ManageCustomer />,
        },
        {
          path: "tour",
          element: <TourManagement />,
        },
        {
          path: "viewcst",
          element: <ViewConsulting />,
        },
        {
          path: "booking",
          element: <ManageBooking />,
        },
        {
          path: "manageOpenTour",
          element: <ManageOpenTour />,
        },
        {
          path: "manageQuotation",
          element: <ManageQuotationSale />,
        },
        {
          path: "manageCustomTour",
          element: <ManageCustomTourSale />,
        },
        {
          path: "manageCustomTour",
          element: <ManageCustomTourSale />,
        },
      ],
    },
    {
      path: "dashboardManager",
      element: (
        <RequiredRole element={<DashboardManager />} requiredRole="MANAGER" />
      ),
      children: [
        {
          path: "manage-tour",
          element: <ManageTour />,
        },
        {
          path: "manage-quotation",
          element: <ManageQuotation />,
        },
        {
          path: "viewfeedback",
          element: <FeedbackView />,
        },
        {
          path: "view-all-quotation",
          element: <ViewAllQuotation />,
        },
      ],
    },
    {
      path: "consulting",
      element: (
        <RequiredRole
          element={<ConsultingDashboard />}
          requiredRole="CONSULTING"
        />
      ),
      children: [
        {
          path: "customer",
          element: <ManageCustomer />,
        },
        {
          path: "tour",
          element: <TourManagementConsul />,
        },
        {
          path: "tourtobooking",
          element: <ViewTourToBooking />,
        },
        {
          path: "booking",
          element: <BookingList />,
        },
        {
          path: "statusconsulting",
          element: <StatusConsulting />,
        },
        {
          path: "booking/order/:id",
          element: <OrderList />,
        },
        {
          path: "manageSchedule",
          element: <ManageSchedule />,
        },
        {
          path: "manageCustomBooking",
          element: <ManageCustombooking />,
        },
        {
          path: "orderCustomTour",
          element: <OrderCustomTour />,
        },
        {
          path: "manageOrderCustomBooking",
          element: <ManageOrderCustomBooking />,
        },
        {
          path: "consultingViewCustomBooking",
          element: <ConsultingViewCustomBooking />,
        },
      ],
    },

    {
      path: "/consulting-active-trip",
      element: <ConsultingViewActiveTour />,
    },

    {
      path: "/consulting-add-order/:bookingId",
      element: <AddFishOrder />,
    },
    {
      path: "/consulting-view-order-customTour/:customBookingId",
      element: <OrderCustomTour />,
    },
    {
      path: "/consulting-view-order/:orderId",
      element: <FishOrderForBooking />,
    },
    {
      path: "/consulting-edit-order-customTour/:orderId",
      element: <UpdateDeleteOrderCustomTour />,
    },

    {
      path: "/customer-view-order/:bookingId",
      element: <CustomerFishOrder />,
    },

    {
      path: "/consulting-view-booking/:openTourId",
      element: <ConsultingViewBooking />,
    },

    {
      path: "/customer-view-order-dream-tour/:cusBookingId",
      element: <CustomerOrderDreamTour />,
    },
    {
      path: "profile",
      element: <ProfileMenu />,
      children: [
        {
          index: true,
          element: <Navigate to="account" replace />,
        },
        {
          path: "account",
          element: <Account />,
          children: [
            {
              path: "fullname",
              element: <ChangeFullName />,
            },
            {
              path: "email",
              element: <ChangeEmail />,
            },
            {
              path: "phone",
              element: <ChangePhone />,
            },
            {
              path: "password",
              element: <ChangePassword />,
            },
            {
              path: "address",
              element: <ChangeAddress />,
            },
          ],
        },

        {
          path: "tour-booking",
          element: <CustomerTourBooking />,
          children: [],
        },

        {
          path: "dream-tour-booking",
          element: <CustomerDreamTour />,
          children: [],
        },
      ],
    },

    {
      path: "/customer-quotation/:bookingId",
      element: <ViewQuotation />,
    },
    {
      path: "unauthorized",
      element: <Unauthorized />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
