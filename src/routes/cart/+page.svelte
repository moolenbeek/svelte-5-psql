<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
	import { Trash2 } from "lucide-svelte";
  
	interface CartItem {
	  id: number;
	  name: string;
	  price: number;
	  quantity: number;
	}
  
	let cartItems: CartItem[] = [
	  { id: 1, name: "Product 1", price: 19.99, quantity: 2 },
	  { id: 2, name: "Product 2", price: 29.99, quantity: 1 },
	  { id: 3, name: "Product 3", price: 9.99, quantity: 3 },
	];
  
	function updateQuantity(id: number, newQuantity: number) {
	  cartItems = cartItems.map(item => 
		item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
	  );
	}
  
	function removeItem(id: number) {
	  cartItems = cartItems.filter(item => item.id !== id);
	}
  
	$: total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  </script>
  
  <div class="container mx-auto pt-16">
	<h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>
	
	{#if cartItems.length === 0}
	  <p class="text-gray-500">Your cart is empty.</p>
	{:else}
	  <Table>
		<TableHeader>
		  <TableRow>
			<TableHead>Product</TableHead>
			<TableHead>Price</TableHead>
			<TableHead>Quantity</TableHead>
			<TableHead>Total</TableHead>
			<TableHead></TableHead>
		  </TableRow>
		</TableHeader>
		<TableBody>
		  {#each cartItems as item (item.id)}
			<TableRow>
			  <TableCell>{item.name}</TableCell>
			  <TableCell>${item.price.toFixed(2)}</TableCell>
			  <TableCell>
				<div class="flex items-center space-x-2">
				  <Button variant="outline" size="icon" on:click={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
				  <Input type="number" value={item.quantity} min="1" class="w-16 text-center" on:input={(e) => e.target instanceof HTMLInputElement && updateQuantity(item.id, parseInt(e.target.value))} />
				  <Button variant="outline" size="icon" on:click={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
				</div>
			  </TableCell>
			  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
			  <TableCell>
				<Button variant="destructive" size="icon" on:click={() => removeItem(item.id)}>
				  <Trash2 class="h-4 w-4" />
				</Button>
			  </TableCell>
			</TableRow>
		  {/each}
		</TableBody>
	  </Table>
  
	  <div class="mt-4 text-right">
		<p class="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
		<Button class="mt-2">Proceed to Checkout</Button>
	  </div>
	{/if}
  </div>
  