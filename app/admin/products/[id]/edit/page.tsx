import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"

async function getProductById(id: number){
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if(!product){
        notFound()
    }

    return product
}

export default async function EditProductsPage({params} : {params : {id : string}}) {
    
    const product = await getProductById(+params.id)
    


    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>

            <Link
                href={'/admin/products'}
                    className={'bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold'}
            >Volver</Link>

            <EditProductForm>
                <ProductForm 
                    product={product}
                />
            </EditProductForm>
        </>
    )
}
