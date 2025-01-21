"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import image from "../images/unibiz-showcase.png";
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
import { Project } from "@/type";
import parseFirebaseDate from "@/utils/parseFirebaseDate";

export default function ShowcaseItem({ items }: { items: Project }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{items.name}</CardTitle>
          <CardDescription>{items.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={
                items.picture.url +
                "?updatedAt=" +
                parseFirebaseDate(items.updatedAt).getTime()
              }
              alt={items.name}
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
                  src={
                    items.picture.url +
                    "?updatedAt=" +
                    parseFirebaseDate(items.updatedAt).getTime()
                  }
                  alt={items.name}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
              <DialogHeader>
                <DialogTitle>{items.name}</DialogTitle>
                <DialogDescription>{items.description}</DialogDescription>
              </DialogHeader>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Pembuat</AccordionTrigger>
                  <AccordionContent>
                    <Table>
                      <TableBody>
                        {items.creators.map((creator, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {creator.name}
                            </TableCell>
                            <TableCell className="text-right">
                              {creator.nim}
                            </TableCell>
                          </TableRow>
                        ))}
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
                    href={items.projectUrl}
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
              href={items.projectUrl}
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
