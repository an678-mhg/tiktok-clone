import React from "react";

const SelectEmoji = () => {
  //   const [openEmoji, setOpenEmoji] = useState(false);
  //   const [searchText, setSearchText] = useState("");
  //   const [emojis, setEmojis] = useState<EmojiType[]>([]);
  //   const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     (async () => {
  //       setIsLoading(true);
  //       try {
  //         const url = `https://emoji-api.com/emojis?search=&access_key=f2f719ab7be2cf7d3bc02b041f10c01c653f8d2d`;
  //         const data = await axios.get(url);
  //         if (data?.data) {
  //           setEmojis(data?.data as EmojiType[]);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //       setIsLoading(false);
  //     })();
  //   }, []);

  //   const timeOutRef = useRef<any>(null);

  //   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearchText(e.target.value);
  //     const value = e.target.value;

  //     if (!value?.trim()) return setEmojis([]);

  //     if (timeOutRef.current) {
  //       clearTimeout(timeOutRef.current);
  //     }

  //     timeOutRef.current = setTimeout(async () => {
  //       setIsLoading(true);
  //       try {
  //         const url = `https://emoji-api.com/emojis?search=${value}&access_key=f2f719ab7be2cf7d3bc02b041f10c01c653f8d2d`;
  //         const data = await axios.get(url);
  //         if (data?.data) {
  //           setEmojis(data?.data as EmojiType[]);
  //         }
  //       } catch (error) {
  //         setEmojis([]);
  //       }
  //       setIsLoading(false);
  //     }, 500);
  //   };

  return (
    <div className="relative w-full flex-1">
      <input
        placeholder="Add comment"
        className="w-full overflow-hidden rounded-md bg-[#2f2f2f] px-4 py-2 text-sm"
      />
      {/* <div
        onClick={() => setOpenEmoji((prev) => !prev)}
        className="absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer px-2"
      >
        <Emoji />
      </div> */}
    </div>
  );
};

export default SelectEmoji;
