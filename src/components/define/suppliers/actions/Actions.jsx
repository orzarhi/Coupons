import ModalDialog from "~/components/ui/modalDialog/ModalDialog";
import PopUp from "~/components/ui/popUp/PopUp";
import { useUnassignCouponToSupplier } from "~/hooks/useCoupons";
import { useDeleteSupplier } from "~/hooks/useSuppliers";
import Form from "../form/Form";

const Actions = ({ setOpen, open, info, refetch }) => {
	const { mutate: deleteMutateSupplier } = useDeleteSupplier(
		setOpen,
		open,
		refetch
	);

	const { mutate: unassignMutateCouponToSupplier } =
		useUnassignCouponToSupplier(setOpen, open, refetch);

	const submitHandler = () => {
		if (open.title === "delete") {
			deleteMutateSupplier(info.supplierCode);
		} else if (open.title === "delete-unassign") {
			const unassignCouponToSupplier = {
				supplierCode: info?.supplierCode,
				couponCode: open?.code,
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
								: open.title === "assign"
								? `שיוך ספק - ${info?.supplierName} לקופון`
								: "הוספת ספק חדש"
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
