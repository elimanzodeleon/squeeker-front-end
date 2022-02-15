import React, { useEffect, useRef, useState } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import PostSettingsDropdown from './PostSettingsDropdown';

interface Props {
  postId: string;
}

// this will be the ellipses on each post if curr user is author of squeek
const PostSettings: React.FC<Props> = ({ postId }) => {
  const dropdownRef = useRef<any>();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const checkOutsideClick = (e: MouseEvent) => {
      // if the dropdown is open AND the user clicked on something that is NOT
      // a descendant of the dropdownRef, close the modal
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', checkOutsideClick);

    return () => {
      document.removeEventListener('click', checkOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <button
      onClick={() => setDropdownOpen(true)}
      // need to conditionally define position because of modal. if we try to squeek and position is always relative, we will be able to see ellipses through the blurred background
      // this is because when the modal is open it thinks that is its parent since the modal has position absolute
      className={`${
        dropdownOpen ? 'relative' : 'static'
      } text-lg mt-1 justify-self-end rounded-md px-2 hover:bg-gray`}
      ref={dropdownRef}
    >
      <p className='text-purple text-sm'>•••</p>
      {dropdownOpen && (
        <PostSettingsDropdown
          postId={postId}
          setDropdownOpen={setDropdownOpen}
          dref={dropdownRef}
        />
      )}
    </button>
  );
};

export default PostSettings;
