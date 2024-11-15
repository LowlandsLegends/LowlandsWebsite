'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';

interface Category {
	id: string;
	name: string;
	image: string;
}

interface CategorySelectorProps {
	categories: Category[];
	selectedCategory: string | null;
	onSelect: (categoryId: string) => void;
	onReset: () => void;
}

export function CategorySelectorComponent({ categories, selectedCategory, onSelect, onReset }: CategorySelectorProps) {
	return (
		<div className="w-64 text-card-foreground p-4 rounded-lg shadow-custom backdrop-blur-sm">
			<button
				onClick={onReset} // Resetting the category selection when clicking 'Categories'
				className="text-lg font-semibold mb-4 text-white"
			>
				Categories
			</button>
			<RadioGroup value={selectedCategory || ""} onValueChange={onSelect} className="space-y-2">
				{categories.map((category) => (
					<div key={category.id} className="flex items-center space-x-2">
						<RadioGroupItem value={category.id} id={category.id} className="peer" />
						<Label
							htmlFor={category.id}
							className="flex text-white items-center space-x-2 cursor-pointer w-full p-2 rounded-md peer-aria-checked:bg-accent peer-aria-checked:text-accent-foreground transition-colors"
						>
							<div className="w-10 h-10 relative overflow-hidden rounded-md">
								<Image
									src={category.image}
									alt={category.name}
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<span>{category.name}</span>
						</Label>
					</div>
				))}
			</RadioGroup>
		</div>
	);
}
