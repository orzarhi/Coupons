import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import {
	useDeleteCoupon,
	useUnassignCouponToCompany,
} from "~/hooks/useCoupons";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { mutate: deleteMutateCoupon } = useDeleteCoupon(
		setOpen,
		open,
		refetch
	);

	const { mutate: unassignMutateCouponToCompany } =
		useUnassignCouponToCompany(setOpen, open, refetch);

	const submitHandler = () => {
		if (open.title === "delete") {
			deleteMutateCoupon(info?.couponCode);
		} else if (open.title === "delete-unassign") {
			const unassignCouponToCompany = {
				couponCode: info?.couponCode,
				companyCode: open?.code,
			};

			console.log("🚀 unassignCouponToCompany", unassignCouponToCompany);
			unassignMutateCouponToCompany(unassignCouponToCompany);
		}
	};
	return (
		<>
			{open.modalDialog && (
				<ModalDialog
					onClick={submitHandler}
					title={"האם אתה בטוח ?"}
					setOpen={setOpen}
					open={open}
				/>
			)}
			{open.popUp && (
				<PopUp setOpen={setOpen} open={open}>
					<Form
						title={
							open.title === "edit"
								? "עריכת נתונים"
								: open.title === "assign"
								? "שיוך קופון"
								: "הוספת קופון חדש"
						}
						info={info}
						refetch={refetch}
						setOpen={setOpen}
						open={open}
					/>
				</PopUp>
			)}
		</>
	);
};

export default Actions;
