import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import {
	useDeleteCoupon,
	useUnassignCouponToCompany,
	useUnassignCouponToSupplier,
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

	const { mutate: unassignMutateCouponToSupplier } =
		useUnassignCouponToSupplier(setOpen, open, refetch);

	const submitHandler = () => {
		if (open.title === "delete") {
			deleteMutateCoupon(info?.couponCode);
		} else if (open.title === "delete-unassign") {
			const unassignCouponToCompany = {
				couponCode: info?.couponCode,
				companyCode: open?.code,
			};
			unassignMutateCouponToCompany(unassignCouponToCompany);
		} else if (open.title === "delete-unassignToSupplier") {
			const unassignCouponToSupplier = {
				couponCode: info?.couponCode,
				supplierCode: open?.code,
			};

			unassignMutateCouponToSupplier(unassignCouponToSupplier);
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
								: open.title !== "add"
								? `שיוך קופון - ${info.couponName}`
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
