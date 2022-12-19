import { useCallback, useEffect, useState } from "react";

const useItemsWithSelectValue = ({
 items,
 allSelectedByDefault,
}) => {
const [itemsWithSelectValue, setItemsWithSelectValue] = useState([]);

const handleSelect = useCallback((id) => {
setItemsWithSelectValue(
itemsWithSelectValue.map((item) => (item.id === id ? { ...item, isSelected: true } : item)),
);
}, [itemsWithSelectValue]);

const handleDeselect = useCallback((id) => {
setItemsWithSelectValue(
itemsWithSelectValue.map((item) => (item.id === id ? { ...item, isSelected: false } : item)),
);
}, [itemsWithSelectValue]);

const handleItemSelectDeselect = useCallback((item) => {
if (item.isSelected) {
handleDeselect(item.id);
} else {
handleSelect(item.id);
}
}, [handleSelect, handleDeselect]);

useEffect(() => {
if (items) {
setItemsWithSelectValue(items.map(
(item) => ('isSelected' in item ? item : { ...item, isSelected: !!allSelectedByDefault }),
));
}
}, [items, allSelectedByDefault]);

return {
itemsWithSelectValue,
handleItemSelectDeselect,
};
};

export default useItemsWithSelectValue;
