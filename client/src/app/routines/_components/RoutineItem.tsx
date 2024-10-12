import { IRoutine } from "../../../types";
import ActiveRoutineItem from "./ActiveRoutineItem";
import InactiveRoutineItem from "./InactiveRoutineItem";

const RoutineItem = ({
	item,
	isActive = false,
}: {
	item: IRoutine;
	isActive?: boolean;
}) => {
	return isActive ? (
		<ActiveRoutineItem item={item} />
	) : (
		<InactiveRoutineItem item={item} />
	);
};

export default RoutineItem;
