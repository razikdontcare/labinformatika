import Image from "next/image";
import Link from "next/link";
import image from "../images/unibiz-showcase.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function ShowcaseItem() {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>UniBiz - Unit Bisnis Udayana</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi
            molestiae totam repudiandae obcaecati eveniet blanditiis?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={image}
              alt="UniBiz - Unit Bisnis Udayana"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Dialog>
            <DialogTrigger className="w-full">
              <Button variant={"outline"} className="w-full">
                Details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AspectRatio ratio={16 / 9} className="mt-2">
                <Image
                  src={image}
                  alt="UniBiz - Unit Bisnis Udayana"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
              <DialogHeader>
                <DialogTitle>UniBiz - Unit Bisnis Udayana</DialogTitle>
                <DialogDescription>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsam, deleniti fuga ullam ut tenetur vel!
                </DialogDescription>
              </DialogHeader>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Pembuat</AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Ni Kadek Rika Dwi Utami
                          </TableCell>
                          <TableCell className="text-right">
                            2308561023
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Komang Krisna Jaya Nova Antara
                          </TableCell>
                          <TableCell className="text-right">
                            2308561029
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Jonathan Federico Tantoro
                          </TableCell>
                          <TableCell className="text-right">
                            2308561053
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Abdurrazik
                          </TableCell>
                          <TableCell className="text-right">
                            2308561083
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button asChild>
                  <Link
                    href="https://unibiz.web.id"
                    className="flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View</span>
                    <ExternalLinkIcon />
                  </Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button asChild className="w-full">
            <Link
              href="https://unibiz.web.id"
              className="flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View</span>
              <ExternalLinkIcon />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
