import CategoryPage from "../pages/CategoryPage/CategoryPage";
import HomePage from "../pages/Homepage/Homepage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/Orderpage/Orderpage";
import ProductsPage from "../pages/Productspage/Productspage";
import SignInPage from "../pages/SignInPage/SignInPage"
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import TrendPage from "../pages/TrendPage/TrendPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true
    },
    {
        path: '/category/:type',
        page: CategoryPage,
        isShowHeader: true
    },
    {
        path: '/trend',
        page: TrendPage,
        isShowHeader: true
    },
    {
        path: '/signin',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: false
    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,
        isShowHeader: true
    },
    {
        path: '/check-out',
        page: CheckOutPage,
        isShowHeader: true,
        isShowFooter: false
    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true
    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
]