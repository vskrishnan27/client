import axios from "axios";

export const removeFromList = (ProductName, setloading, setList, List) => {
    if (
        window.confirm(
            `Do you want to remove the ${ProductName} product from the market?`
        )
    ) {
        try {
            const removecall = async () => {
                setloading(true);
                await axios.post("/deleteProduct", {
                    ProductName,
                });
                const tempList = List.filter(
                    (info) => info.ProductName != ProductName
                );
                setList(tempList);
                setloading(false);
            };
            removecall();
        } catch (err) {
            console.log(err);
        }
    }
};