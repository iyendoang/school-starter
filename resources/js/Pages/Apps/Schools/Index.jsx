import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Search from "@/Components/Search";
import Table from "@/Components/Table";
import AppLayout from "@/Layouts/AppLayout";
import hasAnyPermission from "@/Utils/Permissions";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconCirclePlus,
  IconCopy,
  IconLockAccess,
  IconPencilCog,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Index() {
  const { schools } = usePage().props;
  const { data, setData, post: destroy } = useForm({
    selectedSchools: [],
  });
  const [expandedRows, setExpandedRows] = useState([]);

  const setSelectedSchool = (e) => {
    let items = data.selectedSchools;

    if (items.includes(e.target.value)) {
      items = items.filter((id) => id !== e.target.value);
    } else {
      items.push(e.target.value);
    }

    setData("selectedSchools", items);
  };

  const deleteData = async () => {
    Swal.fire({
      title: "Are you sure you want to delete these schools?",
      text: "Deleted schools cannot be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        destroy("/apps/schools/bulk-delete", {
          data: { ids: data.selectedSchools },
          onSuccess: () => {
            Swal.fire({
              title: "Deleted!",
              text: "The schools have been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
            setData("selectedSchools", []);
          },
        });
      }
    });
  };

  const toggleRow = (schoolId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(schoolId)
        ? prevExpandedRows.filter((id) => id !== schoolId)
        : [...prevExpandedRows, schoolId]
    );
  };

  const [copiedTokenId, setCopiedTokenId] = useState(null); // State to track copied token ID

  const copyToClipboard = (text, tokenId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTokenId(tokenId); // Set the copied token's ID
      toast.success("Token copied to clipboard!"); // Optional: show a toast notification

      setTimeout(() => {
        setCopiedTokenId(null); // Reset after 2 seconds
      }, 2000); // Reset the copied state after a delay
    });
  };
  const [copiedNpsnId, setCopiedNpsnId] = useState(null); // State to track copied token ID

  const copyNpsnClipboard = (text, npsnId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedNpsnId(npsnId); // Set the copied token's ID
      toast.success("Npsn copied to clipboard!"); // Optional: show a toast notification

      setTimeout(() => {
        setCopiedTokenId(null); // Reset after 2 seconds
      }, 2000); // Reset the copied state after a delay
    });
  };
  return (
    <>
      <Head title="Schools" />
      <div className="mb-2">
        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-row gap-2 items-center">
            {hasAnyPermission(["schools-create"]) && (
              <Button
                type="link"
                href="/apps/schools/create"
                icon={<IconCirclePlus size={20} strokeWidth={1.5} />}
                variant="gray"
                label="Add New School"
              />
            )}
            {hasAnyPermission(["schools-delete"]) &&
              data.selectedSchools.length > 0 && (
                <Button
                  type="button"
                  icon={<IconTrash size={20} strokeWidth={1.5} />}
                  variant="roseBlack"
                  label={`Delete ${data.selectedSchools.length} selected`}
                  onClick={deleteData}
                />
              )}
          </div>
          <div className="w-full md:w-4/12">
            <Search url="/apps/schools" placeholder="Search by school name" />
          </div>
        </div>
      </div>
      <Table.Card title="School Data">
        <Table>
          <Table.Thead>
            <tr>
              <Table.Th className="w-10">
                <Checkbox
                  onChange={(e) => {
                    const allSchoolIds = schools.data.map((school) =>
                      school.id.toString()
                    );
                    setData(
                      "selectedSchools",
                      e.target.checked ? allSchoolIds : []
                    );
                  }}
                  checked={data.selectedSchools.length === schools.data.length}
                />
              </Table.Th>
              <Table.Th className="w-10">No</Table.Th>
              <Table.Th>School Name</Table.Th>
              <Table.Th>NPSN</Table.Th>
              <Table.Th>Tokens</Table.Th>
              <Table.Th>Actions</Table.Th>
            </tr>
          </Table.Thead>
          <Table.Tbody>
            {schools.data.length ? (
              schools.data.map((school, i) => (
                <React.Fragment key={school.id}>
                  <tr
                    className="hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
                    onClick={() => toggleRow(school.id)} // Make the row clickable
                  >
                    <Table.Td>
                      <Checkbox
                        value={school.id}
                        onChange={setSelectedSchool}
                        checked={data.selectedSchools.includes(
                          school.id.toString()
                        )}
                        onClick={(e) => e.stopPropagation()} // Prevent checkbox click from toggling the row
                      />
                    </Table.Td>
                    <Table.Td className="text-center">
                      {++i + (schools.current_page - 1) * schools.per_page}
                    </Table.Td>
                    <Table.Td>{school.name}</Table.Td>
                    <Table.Td>{school.npsn}</Table.Td>
                    <Table.Td>
                      <button
                        className="text-blue-500"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row toggle on button click
                          toggleRow(school.id);
                        }}
                      >
                        {expandedRows.includes(school.id) ? (
                          <IconChevronUp size={16} strokeWidth={1.5} />
                        ) : (
                          <IconChevronDown size={16} strokeWidth={1.5} />
                        )}
                      </button>
                    </Table.Td>
                    <Table.Td>
                      <div className="flex gap-2">
                        {hasAnyPermission(["schools-edit"]) && (
                          <Button
                            type="edit"
                            icon={<IconPencilCog size={16} strokeWidth={1.5} />}
                            variant="orange"
                            href={`/apps/schools/${school.id}/edit`}
                            onClick={(e) => e.stopPropagation()} // Prevent row toggle on button click
                          />
                        )}
                        {hasAnyPermission(["schools-delete"]) && (
                          <Button
                            type="delete"
                            icon={<IconTrash size={16} strokeWidth={1.5} />}
                            variant="rose"
                            url={`/apps/schools/${school.id}`}
                            method="delete"
                            onClick={(e) => e.stopPropagation()} // Prevent row toggle on button click
                          />
                        )}
                      </div>
                    </Table.Td>
                  </tr>

                  {expandedRows.includes(school.id) && (
                    <tr className="bg-transparent dark:bg-transparent">
                      <Table.Td colSpan={6} className={"pb-4"}>
                        <div className="flex items-center justify-between m-2">
                          <div className="flex flex-row gap-2 items-center">
                            <IconLockAccess
                              size={24}
                              strokeWidth={1.5}
                              className="text-gray-500 dark:text-white"
                            />
                            <span className="text-md font-bold leading-none text-gray-900 dark:text-white">
                              Tokens
                            </span>
                          </div>
                          <div>
                            <Button
                              type="link"
                              icon={<IconPlus size={16} strokeWidth={1.5} />}
                              label="Add Token App"
                              variant="orange"
                              href={`/apps/tokens/${school.id}/create`}
                            />
                          </div>
                        </div>
                        <Table>
                          <Table.Thead>
                            <tr>
                              <Table.Th>No</Table.Th>
                              <Table.Th>App</Table.Th>
                              <Table.Th>NPSN</Table.Th>
                              <Table.Th>Token</Table.Th>
                              <Table.Th>Expired</Table.Th>
                              <Table.Th>Status</Table.Th>
                              <Table.Th>Actions</Table.Th>
                            </tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {school.tokens.length ? (
                              school.tokens.map((token, i) => (
                                <tr
                                  key={token.id}
                                  className="hover:bg-indigo-100 dark:hover:bg-indigo-900 bg-green-100 dark:bg-green-900"
                                >
                                  <Table.Td className="text-center">
                                    {++i}
                                  </Table.Td>
                                  <Table.Td>{token.application_name}</Table.Td>
                                  <Table.Td>
                                    <div className="flex items-center gap-2">
                                      <span>{school.npsn}</span>
                                      <button
                                        className="text-blue-500"
                                        onClick={() =>
                                          copyNpsnClipboard(
                                            school.npsn,
                                            token.id
                                          )
                                        } 
                                      >
                                        {copiedNpsnId === token.id ? ( 
                                          <IconCheck
                                            size={16}
                                            strokeWidth={1.5}
                                          />
                                        ) : (
                                          <IconCopy
                                            size={16}
                                            strokeWidth={1.5}
                                          />
                                        )}
                                      </button>
                                    </div>
                                  </Table.Td>
                                  <Table.Td>
                                    <div className="flex items-center gap-2">
                                      <span>{token.token_access}</span>
                                      <button
                                        className="text-blue-500"
                                        onClick={() =>
                                          copyToClipboard(
                                            token.token_access,
                                            token.id
                                          )
                                        } 
                                      >
                                        {copiedTokenId === token.id ? ( 
                                          <IconCheck
                                            size={16}
                                            strokeWidth={1.5}
                                          />
                                        ) : (
                                          <IconCopy
                                            size={16}
                                            strokeWidth={1.5}
                                          />
                                        )}
                                      </button>
                                    </div>
                                  </Table.Td>
                                  <Table.Td>{token.expired_at}</Table.Td>
                                  <Table.Td>{token.status}</Table.Td>
                                  <Table.Td>
                                    <div className="flex gap-2">
                                      <Button
                                        type="edit"
                                        icon={
                                          <IconPencilCog
                                            size={16}
                                            strokeWidth={1.5}
                                          />
                                        }
                                        variant="orange"
                                        href={`/apps/tokens/${token.id}/edit`}
                                      />
                                      <Button
                                        type="delete"
                                        icon={
                                          <IconTrash
                                            size={16}
                                            strokeWidth={1.5}
                                          />
                                        }
                                        variant="rose"
                                        url={`/apps/tokens/${token.id}`}
                                        method="delete"
                                      />
                                    </div>
                                  </Table.Td>
                                </tr>
                              ))
                            ) : (
                              <Table.Empty
                                colSpan={3}
                                message="No tokens available"
                              />
                            )}
                          </Table.Tbody>
                        </Table>
                      </Table.Td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <Table.Empty colSpan={5} message="No schools found" />
            )}
          </Table.Tbody>
        </Table>
      </Table.Card>
    </>
  );
}

Index.layout = (page) => <AppLayout children={page} />;
