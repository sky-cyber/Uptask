export default function ErrorMessage({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="text-center my-2 bg-discord-background text-discord-dnd font-bold p-3 uppercase text-sm">
         {children}
      </div>
   );
}
