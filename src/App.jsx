import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
// import Navigator from "./components/navigator/NavigatorOld";
import Routers from "./Routers";
import { useAuthStore } from "./store/auth";
import { tokenCookies } from "~/services/cookiesService";
import { Navigator } from "./components/navigator/Navigator";

function App() {
	const token = tokenCookies.get();

	const navigate = useNavigate();

	const { isLoggedIn, isSysAdmin } = useAuthStore();

	const queryClient = new QueryClient({
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
	});

	useEffect(() => {
		if (isLoggedIn) return;
		navigate("/");
	}, [isLoggedIn]);

	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
			{/* {window.innerWidth > 700 && ( */}
			<>
				{/* {isSysAdmin && token && <Header />} */}
				{/* {isSysAdmin && token && <Navigator />} */}
				{isSysAdmin && token && <Navigator />}
				{/* {isSysAdmin && token && <Footer />} */}
			</>
			{/* )} */}
			<Routers />
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
