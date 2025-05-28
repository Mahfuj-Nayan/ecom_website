import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getAllCategories } from "@/lib/actions/product.actions";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const CategoryDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-w-sm md:max-w-xs">
        <DrawerTitle className="mt-4 ml-4">Select a category</DrawerTitle>
        <div className="space-y-1 mt-4 ml-6">
          {categories.map((c) => (
            <Button
              variant="ghost"
              className="w-full justify-start"
              key={c.category}
              asChild
            >
              <DrawerClose asChild>
                <Link href={`search?category=${c.category}`}>
                  {c.category} ({c._count})
                </Link>
              </DrawerClose>
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoryDrawer;
