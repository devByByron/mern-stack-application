import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<Container maxW={"container.xl"} py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient="linear(to-l, #7928CA, #FF0080)"
					bgClip={"text"}
					textAlign={"center"}
				>
					Current Products
				</Text>
				<SimpleGrid
					columns={{ base: 1, md: 2, lg: 3 }}
					spacing={10}
					w={"full"}
				>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<Text
						fontSize={"xl"}
						textAlign={"center"}
						alignItems={"center"}
						fontWeight={"bold"}
						color={"gray.500"}
						display={"flex"}
						gap={"2"}
					>
						No Products found <FaRegSadTear />
						{""}
						<Link to={"/create"}>
							<Text
								as="span"
								color="blue.500"
								_hover={{ textDecoration: "underline" }}
							>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};

export default HomePage;
