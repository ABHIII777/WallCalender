import { Card } from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CalenderSection from "./CalenderSection";
import ImageSection from "./ImageSection";

export default function CalenderCard() {

    


    return (
        <Card className="w-[900px] h-[500px] overflow-hidden rounded-2xl shadow-xl flex">
            <div className="w-1/2 bg-white p-8 relative">
                <CalenderSection />
            </div>

            <div className="w-1/2 relative">
                <ImageSection />
            </div>
        </Card>
    );
}